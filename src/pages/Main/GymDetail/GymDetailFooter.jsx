import { memo } from "react";
import { mainStore } from "@/stores/mainStore";

function GymDetailFooter(){
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  return(

  );
}

export default memo(GymDetailFooter)