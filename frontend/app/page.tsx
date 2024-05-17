'use client'
import { DialogDemo } from "@/components/blocks/AddUserModal";
import { DataTableDemo, UserData } from "@/components/blocks/DataTable";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getUserData, sendMail } from "@/services/services"
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"




const Home = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [selectedRowsData, setSelectedRowsData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()


  const fetchData = async () => {
    try {
      const response = await getUserData()
      setData(response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleSendMail = async () => {
    console.log(selectedRowsData);
    try {
      const formData = new FormData();
      if (selectedRowsData && Array.isArray(selectedRowsData)) {
        selectedRowsData.forEach((row) => {
          console.log('user[]', JSON.stringify(row));
          formData.append('users[]', JSON.stringify(row));
        });
      } else {
        console.error('selectedRowsData is not an array or is undefined:', selectedRowsData);
        alert('No users selected. Please select at least one user to send mail.');
        return; // Exit the function early since there is nothing to process
      }
      const formDataEntries = Array.from(formData.entries());
      formDataEntries.forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
      if (formData.has('users[]')) {
        await sendMail(formData);
        toast({
          title: "Sent Mail",
        })
      } else {
        toast({
          title: "Error sending mail",
        })

      }
    } catch (error) {
      console.error('Error sending mail:', error);
      alert('Failed to send mail.');
    }
  };




  return (
    <main className="flex flex-col flex-1 item-center justify-between p-4">
      <div className="flex flex-col gap-8 z-10 w-full max-w-5xl font-mono text-sm lg:flex">
        <h1 className="text-3xl font-bold text-primary">User Data</h1>
        <DialogDemo />
        <DataTableDemo data={data} setSelectedRowsData={setSelectedRowsData} />
        <Button disabled={loading} className="w-fit" onClick={handleSendMail}>{loading ? 'Sending...' : 'Send Mail'} </Button>
      </div>
    </main>
  );
}

export default Home