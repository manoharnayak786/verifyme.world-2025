import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";

export type UserRole = "learner" | "issuer" | "verifier" | null;

interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export function UserRoleProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available to persist across refreshes
  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem("verifyMe_userRole");
    return (saved as UserRole) || null;
  });

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    if (role) {
      localStorage.setItem("verifyMe_userRole", role);
    } else {
      localStorage.removeItem("verifyMe_userRole");
    }
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
}
