"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const AuthModal = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] text-center">
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
        </DialogHeader>

        <p className="text-gray-500 text-sm">
          Please login or register to apply for this job.
        </p>

        <DialogFooter className="flex flex-col gap-2 mt-4">
          <Link to="/auth/login">
            <Button className="w-full">Login</Button>
          </Link>

          <Link to="/auth/register">
            <Button variant="outline" className="w-full">
              Register
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
