import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { useDesingerKey } from "../../context"
import { redoListState, undoListState } from "../atoms";

export function useUndo() {
  const key = useDesingerKey();
  const [undoList, setUndoList] = useRecoilState(undoListState(key));
  const [reddoList, setRedoList] = useRecoilState(redoListState(key));

  const undo = useCallback(() => {

  }, []);

  return {
    undoDisabled: undoList.length === 0,
    undo
  }
}