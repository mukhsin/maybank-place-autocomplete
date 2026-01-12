import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";

export const useAppDispatch = useDispatch as () => AppDispatch;
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);
