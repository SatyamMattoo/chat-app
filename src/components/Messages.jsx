import React from 'react'
import {HStack,Avatar,Text} from "@chakra-ui/react"


function messages({text,uri,user="me"}) {
  return (
    <HStack bg={"whitesmoke"} paddingX="2" paddingY="1" borderRadius={"5"} alignSelf= {(user==="me")?"flex-end":"flex-start"}>
        { (user==="other") && <Avatar src={uri}/> }
        <Text> {text}</Text>
        { (user==="me") && <Avatar src={uri}/> }
    </HStack>
  )
}

export default messages