import { connectMongoDB } from "@/lib/mongodb";
import Asset from "@/app/models/Asset";

export async function GET(req) {
  try {
    await connectMongoDB();
    const assets = await Asset.find();
    return new Response(JSON.stringify(assets), { status: 200 });
  } catch (error) {
    console.error("Error fetching assets:", error.message);
    return new Response(
      JSON.stringify({ message: "Error fetching assets", error: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { amount, userId } = await req.json();

  try {
    console.log("Updating asset for userId:", userId, "with amount:", amount); // Debug: ตรวจสอบค่าที่ส่งมา
    await connectMongoDB();
    const userAsset = await Asset.findOneAndUpdate(
      { name: "Total Assets", userId }, // ค้นหา Asset ตาม userId
      { $inc: { amount } }, // เพิ่มจำนวนเงินเข้าไป
      { new: true, upsert: true } // สร้างเอกสารใหม่ถ้าไม่มี
    );
    console.log("Updated asset:", userAsset); // Debug: ตรวจสอบผลลัพธ์
    return new Response(JSON.stringify(userAsset), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error updating total assets:", error.message); // Debug: แสดงข้อความข้อผิดพลาด
    return new Response(
      JSON.stringify({ message: "Error updating total assets", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
