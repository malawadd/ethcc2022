// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract Booking is Ownable {
    using Address for address payable;

    event Booked(address indexed payee, uint256 endtime, uint256 weiAmount);
    event Refunded(address indexed payee, uint256 weiAmount);
    event Burned(address indexed notBribe, uint256 weiAmount);

    struct Booking {
        uint256 amountGwei;
        uint256 timestamp;
        bool released;
    }
    mapping(bytes32 => Booking) private _bookings;

    function _hashBooking(address payee, uint256 endtime)
        private
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(payee, endtime));
    }

    function bookingsOf(address payee, uint256 endtime)
        public
        view
        returns (uint256)
    {
        return _bookings[_hashBooking(payee, endtime)].amountGwei;
    }

    function book(address payee, uint256 endtime) public payable virtual {
        uint256 amount = msg.value;
        _bookings[_hashBooking(payee, endtime)] = Booking(
            amount,
            endtime,
            false
        );
        emit Booked(payee, endtime, amount);
    }

    function release(address payee, uint256 endtime) public virtual onlyOwner {
        _bookings[_hashBooking(payee, endtime)].released = true;
    }

    function refund(address payable payee, uint256 endtime) public virtual {
        bytes32 index = _hashBooking(payee, endtime);
        Booking memory booking = _bookings[index];

        require(
            booking.released || block.timestamp > endtime,
            "Does not meet conditions for refund"
        );

        _bookings[index] = Booking(0, 0, false);

        payee.sendValue(booking.amountGwei);

        emit Refunded(payee, booking.amountGwei);
    }

    function returnFunds(address payable payee, uint256 endtime)
        public
        virtual
        onlyOwner
    {
        bytes32 index = _hashBooking(payee, endtime);
        Booking memory booking = _bookings[index];

        _bookings[index] = Booking(0, 0, false);

        payee.sendValue(booking.amountGwei);

        emit Refunded(payee, booking.amountGwei);
    }

    function burn(
        address payable notBribe,
        address payable payee,
        uint256 endtime
    ) public virtual {
        bytes32 index = _hashBooking(payee, endtime);
        Booking memory booking = _bookings[index];

        require(
            !booking.released || block.timestamp < endtime,
            "Does not meet conditions for burn"
        );

        _bookings[index] = Booking(0, 0, false);

        notBribe.sendValue(booking.amountGwei);

        emit Burned(notBribe, booking.amountGwei);
    }
}
