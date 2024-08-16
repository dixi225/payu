import { useRecoilValue } from "recoil";
import balanceAtom from "../atoms/balanceAtom";


export default function(){
    const value=useRecoilValue(balanceAtom)
    return value
}
