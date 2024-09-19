import { memo } from "react";
import { mainStore } from "@/stores/mainStore";

function Refundpolicy(){
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  return(

  );
}

export default memo(Refundpolicy)