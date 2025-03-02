import StreakIcon from "@/assets/icons/streak";
import useGlobalStreakDialog from "@/hooks/zustand/use-global-streak-dialog";

const StreakButton = () => {
  const { setOpenDialog } = useGlobalStreakDialog();
  return (
    <li className="mt-2 md:hidden">
      <button
        className="flex h-fit min-h-10 items-center gap-2.5 rounded-lg p-3 text-supporting-text transition-all duration-300"
        onClick={() => setOpenDialog()}
      >
        <div className="mx-2 h-full w-6 items-center justify-center">
          <StreakIcon className="size-6 opacity-50 grayscale" />
        </div>
        <span className="flex flex-1 select-none items-center text-nowrap font-medium duration-300">
          Streak
        </span>
      </button>
    </li>
  );
};

export default StreakButton;
