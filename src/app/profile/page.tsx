"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import {
  BookOpen,
  BookMarked,
  Plus,
  LogOut,
  Mail,
  UserRound,
  Loader2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loggingOut, setLoggingOut] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !session && !loggingOut) {
      router.replace("/login");
    }
  }, [isPending, session, loggingOut, router]);

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Logout failed.");
      }

      toast.success("Logged out successfully!", {
        description: "You have been logged out of BookNook.",
      });

      setTimeout(() => {
        router.replace("/");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error("Logout failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Logout failed. Please try again.",
      );

      setLoggingOut(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-amber-500" />
      </div>
    );
  }

  const userName = user.name || "BookNook User";
  const userEmail = user.email || "No email available";

  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="container-page min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your BookNook account and library.
          </p>
        </div>

        <Card className="overflow-hidden border-border/70 shadow-sm">
          <div className="h-24 border-b border-border/60 bg-secondary/70" />

          <CardContent className="px-6 pb-8">
            <div className="-mt-14 flex flex-col items-center gap-3">
              <Avatar className="size-28 border-4 border-background shadow-md">
                <AvatarImage
                  src={user.image || undefined}
                  alt={userName}
                />
                <AvatarFallback className="bg-amber-100 text-3xl font-bold text-amber-800">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1 text-center">
                <h2 className="text-2xl font-bold">{userName}</h2>
                <p className="text-sm text-muted-foreground">
                  BookNook Member
                </p>
              </div>

              <div className="mt-5 grid w-full gap-5 rounded-xl bg-muted/50 p-5 sm:grid-cols-2">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="grid size-10 place-items-center rounded-full bg-amber-100 text-amber-700">
                    <UserRound className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Full Name
                    </p>
                    <p className="font-semibold">{userName}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="grid size-10 place-items-center rounded-full bg-amber-100 text-amber-700">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Email Address
                    </p>
                    <p className="break-all font-semibold">{userEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">My Library</h2>
            <p className="text-sm text-muted-foreground">
              Quickly access your books and borrow history.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link href="/my-books">
              <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-md">
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="grid size-11 place-items-center rounded-lg bg-amber-100 text-amber-700">
                    <BookOpen className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">My Books</h3>
                    <p className="text-xs text-muted-foreground">
                      Manage books
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/my-borrows">
              <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-md">
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="grid size-11 place-items-center rounded-lg bg-amber-100 text-amber-700">
                    <BookMarked className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">My Borrows</h3>
                    <p className="text-xs text-muted-foreground">
                      Borrow history
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/add-book">
              <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-md">
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="grid size-11 place-items-center rounded-lg bg-amber-100 text-amber-700">
                    <Plus className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Add Book</h3>
                    <p className="text-xs text-muted-foreground">
                      Add to library
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-lg">Logout</CardTitle>
            <CardDescription>
              Sign out of your BookNook account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={loggingOut}
              className="gap-2"
            >
              {loggingOut ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <LogOut className="size-4" />
              )}
              {loggingOut ? "Logging out..." : "Logout"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
