import { useSignOut } from "@/hooks/react-query/useAuth";
import { useAccountIdentifier } from "@/hooks/react-query/useUsers";
import { useAuthStore } from "@/hooks/useAuthStore";
import { getAuthValueFromStorage } from "@/services";

import { StreakSection } from "../organisms/streak";
import { Button } from "../ui";

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
      {isLoading ? (
        <div className="text-center text-2xl font-bold">Loading... </div>
      ) : (
        data && <div className="flex h-screen basis-3/5 flex-col justify-start gap-9 p-8"></div>
      )}
      <div>other component</div>
    </main>
  );
}
