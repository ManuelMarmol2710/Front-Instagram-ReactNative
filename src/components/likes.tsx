import React, { useState, useEffect, useCallback} from "react";
import {
    Pressable,
    Text
  } from "react-native";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
function Likes() {
   const [like,setLike] = useState(0)
    const [isLike,setisLike] = useState(false)
   
    const onLikeButtonClick = () => {
   setLike(like +(isLike ? -1 : 1));
   setisLike(!isLike);
   
    }
return(
    <Pressable onPress={onLikeButtonClick}>
       <MaterialCommunityIcons
        name={like ? "heart" : "heart-outline"}
        size={32}
        color={like? "red" : "black"}
      />
      <Text >{"" + (isLike ? like :"")} </Text>
    </Pressable>
)



}
export default Likes