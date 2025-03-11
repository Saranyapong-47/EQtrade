import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function NewDashboard() {
    return (
        <div className="flex min-h-screen">
            <div className="w-[15%] min-w-[150px] max-w-[250px] bg-gray-800 text-white p-4 flex flex-col items-center">
                Sidebar
                
            </div>

            <div className="flex-1 w-sceen h-screen mx-auto ">
                <Card>
                </Card>

            </div>


        </div>
    )
}
