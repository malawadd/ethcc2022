export function formatAddr(addr) {
    const ADDR_LEN = 10
    if (!addr) {
      return ''
    }
    if (addr.length > 10) {
      return `${addr.substr(0, ADDR_LEN - 1)}...`
    }
  }
  