export function generateWalletNumber() {
  const digits = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // สุ่มเลข 10 หลัก
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}
