import { memo } from "react";
import { mainStore } from "@/stores/mainStore";

function ReviewLink(){
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  return(

  );
}

export default memo(ReviewLink)