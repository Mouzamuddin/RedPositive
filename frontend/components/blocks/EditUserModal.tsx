import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"
import { addUserData, updateUserData } from "@/services/services";
import { UserData } from "./DataTable";
export type UserFormData = {
    name: string;
    email: string;
    phoneNumber: number | undefined;
    hobbies: string
}

export function UpdateUserModal({ user }: {
    user: UserData

}) {
    const { name, email, phoneNumber, hobbies } = user
    const [formData, setFormData] = useState<UserFormData>({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        hobbies: hobbies,
    });
    const { toast } = useToast()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        console.log(form)
        if (form.checkValidity()) {
            try {

                await updateUserData(user._id, formData);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                toast({
                    title: "Updated User",
                })

            } catch (error) {
                console.error('Error adding user:', error);
                toast({
                    title: "Error adding user",
                    description: "Please try again",
                })
            }
        } else {
            form.reportValidity();
        }
    };

    return (


        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={onSubmit}>
                <DialogHeader>
                    <DialogTitle>Update User Details</DialogTitle>
                    <DialogDescription>
                        Please Update user details here.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="name" className="text-right w-12" >
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={onChange}
                            className="flex-1"
                            placeholder="Enter name here..."
                            required
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Label htmlFor="email" className="text-right w-12">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="Enter email here..."
                            value={formData.email}
                            onChange={onChange}
                            className="flex-1"
                            type="email"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Label htmlFor="phoneNumber" className="text-right w-12">
                            Phone Number
                        </Label>
                        <Input
                            id="phoneNumber"
                            placeholder="Enter phone number here..."
                            value={formData.phoneNumber}
                            onChange={onChange}
                            className="flex-1"
                            type="tel"
                            pattern="^\d{10,15}$" // Removed the requirement for the "+" sign
                            required
                        />

                    </div>
                    <div className="flex items-center gap-4">
                        <Label htmlFor="hobbies" className="text-right w-12">
                            Hobbies
                        </Label>
                        <Input
                            id="hobbies"
                            value={formData.hobbies}
                            onChange={onChange}
                            className="flex-1"
                            placeholder="Enter hobbies here..."
                            required
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </form>
        </DialogContent>

    );
}
