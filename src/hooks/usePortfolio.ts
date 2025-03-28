import { useEffect, useState } from "react";

export interface PortfolioItem {
  symbol: string;
  category: string;
  quantity: number;
  icon?: string;
}

export const usePortfolio = (userId: string | null) => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/portfolio?userId=${userId}`);

        // ตรวจสอบการตอบกลับก่อนแปลงเป็น JSON
        const text = await res.text();  // อ่านการตอบกลับเป็นข้อความ
        console.log(text);  // บันทึกข้อความที่ได้รับจาก API (HTML หรือ JSON)

        if (!res.ok) {
          // หากการตอบกลับไม่เป็น 200 status code, แสดงข้อผิดพลาด
          throw new Error('Error fetching portfolio');
        }

        try {
          const data = JSON.parse(text);  // ลองแปลงเป็น JSON
          setPortfolio(data);  // ตั้งค่า portfolio
        } catch (jsonError) {
          console.error('Failed to parse JSON:', jsonError);
        }
      } catch (error) {
        console.error("Error loading portfolio", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [userId]);

  return { portfolio, loading };
};
