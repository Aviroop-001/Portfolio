import { useState } from "react";
import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { IoSchool } from "react-icons/io5";
import { educationData } from "./Data";

export default function Education() {

  return (
    <Box
      height="100%"
      width="100vw"
      backgroundColor="#d5dbd8"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      id="education"
    >
      <Text fontSize={["3rem", "4rem"]}>Education</Text>
      <List spacing={3}>
        {educationData.map((edu) => {
            return (
              <ListItem
                display="flex"
                alignItems="center" id={edu.org}
              >
                <IoSchool fontSize='20px'/>
                <Box display="inline-block" marginLeft='10px' flexWrap='wrap'>
                  <Text fontWeight="bold">{edu.org}</Text>
                  <Text>{edu.position}, {edu.date}</Text>
                </Box>
              </ListItem>
            );
        })}
      </List>
    </Box>
  );
}
