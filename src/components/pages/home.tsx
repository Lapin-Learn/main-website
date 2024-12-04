import { Link } from "@tanstack/react-router";

import { useSignOut } from "@/hooks/react-query/useAuth";
import { useAccountIdentifier } from "@/hooks/react-query/useUsers";
import { useAuthStore } from "@/hooks/useAuthStore";
import { getAuthValueFromStorage } from "@/services";

import { Button } from "../ui";
import SideBar from "../organisms/side-bar";
import { ExamList } from "../mocules/record-test/exam-list";
import { Skeleton } from "../ui/skeleton";
import HeroImage from "@/assets/images/hero-image.jpg";

export default function HomePage() {
  const signOut = useSignOut();
  const { data, isError, isLoading } = useAccountIdentifier();
  const { accessToken, setAccessToken } = useAuthStore();

  if (!accessToken) {
    const token = getAuthValueFromStorage()?.accessToken;
    if (token) {
      setAccessToken(token);
    }
  }

  if (isError) {
    signOut.mutate();
    return <div>Session expired</div>;
  }
  return (
    <main className="size-screen flex flex-row place-items-center content-center gap-2">
      <SideBar />
      {isLoading ? (
        <div className="text-center text-2xl font-bold">Loading... </div>
      ) : (
        data && (
          <div className="flex h-screen basis-3/5 flex-col justify-start gap-9 p-8">
            <img src={HeroImage} alt="hero" className="rounded-2xl object-cover" />
            <ExamList />
          </div>
        )
      )}
      <div>other component</div>
    </main>
  );
}
