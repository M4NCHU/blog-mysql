"use client"

import { useTheme } from 'next-themes'
import { FC, useEffect, useState } from 'react'
import styles from '@/styles/App.module.css';
import {CircularProgress, Card, CardBody, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, DropdownMenu, Dropdown, DropdownTrigger, Avatar, Input} from "@nextui-org/react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { Session } from 'next-auth';
import { AiFillGithub, AiFillRedEnvelope, AiOutlineMenu, AiOutlineSearch, AiOutlineSwitcher } from 'react-icons/ai';
import { BurguerButton } from './burguer-button';
import { UserDropdown } from './user-dropdown';
import { NotificationsDropdown } from './notifications-dropdown';
import SearchSection from './SearchSection/SearchSection';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  session: Session | null
  
}

const Header: FC<HeaderProps> = ({session}) => {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll className='sticky top-0'>
        <NavbarContent className="md:hidden">
          <BurguerButton/>
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<AiOutlineSearch />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
          />
        </NavbarContent>
        <NavbarContent justify="end"
      className="w-fit data-[justify=end]:flex-grow-0">
        <NavbarContent>
            <SearchSection />
        </NavbarContent>
      {session?.user ? (
        <NavbarContent>  
            <NavbarContent>
              <NotificationsDropdown />
            </NavbarContent>
            <NavbarContent>
              <UserDropdown session={session}/>
            </NavbarContent>
        </NavbarContent>
      ) : (
        <NavbarContent>
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="primary" href="#" variant="flat" onClick={()=>router.push('/sign-in')}>
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat" onClick={()=>router.push('/sign-up')}>
            Sign Up
          </Button>
        </NavbarItem>
        </NavbarContent>
      )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    
    //   The current theme is: {theme}
    //   <button onClick={() => setTheme('light')}>Light Mode</button>
    //   <button onClick={() => setTheme('dark')}>Dark Mode</button>
    // </div>
  )
}

export default Header