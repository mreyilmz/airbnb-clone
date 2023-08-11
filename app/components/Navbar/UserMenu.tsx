"use client";

// Third party kütüphaneler
import { AiOutlineMenu } from "react-icons/ai";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

// Component import
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";

// Hooklar
import { useState, useCallback } from "react";

interface UserMenuProps {
  currentUser?: User | null;
}

function UserMenu({ currentUser }: UserMenuProps) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Evinizi Airbnb&lsquo;ye taşıyın
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition "
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[20vw] md:w-3/4 overflow-hidden right-0 top-15 text-sm bg-white">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="Seyahatlerim"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="Favorilerim"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="Rezervasyonlarım"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="Mülklerim"
                />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb evim" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Çıkış yap" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Signup" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
