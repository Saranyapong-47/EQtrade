import admin from "firebase-admin";
import fs from "fs";

// โหลด Service Account Key
const serviceAccount = JSON.parse(fs.readFileSync("service-account.json", "utf8"));

// ตั้งค่า Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

async function deleteUsers() {
  try {
    // ดึงรายการ Users ทั้งหมด (สูงสุด 1000 คน)
    const listUsers = await auth.listUsers(1000);
    const uids = listUsers.users.map(user => user.uid);

    if (uids.length > 0) {
      await auth.deleteUsers(uids);
      console.log(`✅ ลบผู้ใช้ทั้งหมด ${uids.length} คนเรียบร้อยแล้ว!`);
    } else {
      console.log("❌ ไม่มีผู้ใช้ให้ลบ!");
    }
  } catch (error) {
    console.error("❌ ลบผู้ใช้ไม่สำเร็จ:", error);
  }
}

// รันฟังก์ชัน
deleteUsers();
