import { useState } from 'react'

import { navigation } from '../model/navigation'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CardTitle, Card } from '@/components/ui/card'
import SidebarItem from "./SidebarItem"
import { cn } from '@/lib/utils'

const Sidebar = () => {
    const [open, setOpen] = useState(true)

    return (
        <>
            <Card
                className={`absolute md:static h-screen p-4 flex flex-col transform duration-300 ease-in-out
            ${open ? 'translate-x-0 w-64' : '-translate-x-56 w-0'}`}>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold">ARQA</CardTitle>
                    <ArrowLeft
                        onClick={() => setOpen(!open)}
                        className={cn(
                            "cursor-pointer rounded-full hover:bg-gray-300 duration-300 transform",
                            open ? "rotate-0" : "rotate-180 translate-x-12"
                        )}
                    />
                </div>
                <nav className="mt-6 flex flex-col gap-2">
                    {navigation.map((item) => (
                        <SidebarItem key={item.path} {...item} />
                    ))}
                </nav>
            </Card>
            {!open && (
                <ArrowRight
                    onClick={() => setOpen(true)}
                    className="absolute top-5 left-2 cursor-pointer rounded-full hover:bg-gray-300 duration-300"
                />
            )}
        </>
    )
}

export default Sidebar