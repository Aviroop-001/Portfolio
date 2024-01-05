// import "../styling_files/projects.scss";
import { useState } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { projectsData } from "./Data";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text, Button,
  Box, Image, Stack, Heading
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

export default function Projects() {
  const projectList = ["Blogetra", "Collab.io", "Radius", "Intelligram", "User dashboard"]


  return (
    <Box
      height="100%"
      width="100vw"
      backgroundColor="#d5dbd8"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center" id='projects'
    >
      <Text fontSize={["3rem", "4rem"]}>Projects</Text>
      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        width="80%"
        justifyContent="center"
        alignItems="center"
      >
        <TabList justifyContent="center" alignItems="center" flexWrap="wrap">
          {projectList.map((cat) => {
            return (
              <Tab _selected={{ color: "#d5dbd8", bg: "black" }}>{cat}</Tab>
            );
          })}
        </TabList>
        <TabPanels justifyContent="center" alignItems="center" flexWrap="wrap">
          {projectsData.map((p) => {
            return (
              <TabPanel
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
              >
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  width={["100%", "60%"]}
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={p.image}
                  />
                  <Stack>
                    <CardBody>
                      <Heading size="md">{p.title}</Heading>
                      <Text display={["none", "none", "block"]} py="2">
                        {p.description}
                      </Text>
                      <a href={p.liveLink}>
                        <Button
                          marginTop="5px"
                          variant="solid"
                          color="#d5dbd8"
                          backgroundColor="black"
                          _hover={{ shadow: "4px 4px 7px gray" }}
                          _active={{ shadow: "4px 4px 7px gray" }}
                        >
                          website
                        </Button>
                      </a>
                    </CardBody>
                  </Stack>
                </Card>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
