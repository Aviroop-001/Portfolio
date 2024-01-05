import "../styling_files/skills.scss";
import {
  Tag,
  TagLabel, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel,
  HStack
} from "@chakra-ui/react";

export default function Skills() {

  const categories = ['Languages', "Frameworks/libraries", "Tools", "Others"]
  const languages = ["JavaScript","Python", "Golang", "TypeScript", "C++", "C","HTML","CSS","SQL","SASS", "SCSS"]
  const frameworks = [
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "Gin",
    "ReactJS",
    "React Native",
    "Mongoose",
    "jQuery",
    "Redux",
    "TensorFlow",
    "Keras",
    "Pandas",
    "Numpy", "Pyplot",
    "Scrapy",
    "Beautiful Soup ",
  ];
  const others = [
    "AWS", "GCP", "Supabase", "Snowflake",
    "MongoDB",
    "MySQL", "PostgreSQL", "Linux", 
    "REST API",
    "Web Scraping",
    "Git",
    "Docker",
    "Kubernetes",
    "Terraform",
    "CI/CD"
  ];
  const ml = [
    "Machine Learning",
    "Large Language Models",
    "Natural Language Processing",
    "Data Science",
    "System Design",
    "Software Architecture",
  ];

  return (
    <div className="skills" id="skills">
      <Text fontSize={["3rem", "4rem"]}>Skills</Text>
      <Tabs variant="soft-rounded">
        <TabList justifyContent="center" alignItems="center" flexWrap="wrap">
          {categories.map((cat) => {
            return (
              <Tab _selected={{ color: "#d5dbd8", bg: "black" }}>{cat}</Tab>
            );
          })}
          {/* <Tab>languages</Tab>
          <Tab>frameworks</Tab>
          <Tab>others</Tab>
          <Tab>AI/ML</Tab> */}
        </TabList>
        <TabPanels justifyContent="center" alignItems="center" flexWrap="wrap">
          <TabPanel>
            <Box
              w="80vw"
              h="fit-content"
              justifyContent="center"
              alignItems="center"
              p="1rem"
            >
              <HStack
                spacing={4}
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
              >
                {languages.map((f) => (
                  <Tag
                    size={["md", "lg"]}
                    key={f}
                    variant="solid"
                    colorScheme="black"
                    color="black"
                    w="fit-content"
                    _hover={{ variant: "outline", textShadow: "0px 0px 4px" }}
                  >
                    <TagLabel p="5px">{f}</TagLabel>
                  </Tag>
                ))}
              </HStack>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              w="80vw"
              h="fit-content"
              justifyContent="center"
              alignItems="center"
              p="1rem"
            >
              <HStack
                spacing={4}
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
              >
                {frameworks.map((f) => (
                  <Tag
                    size={["md", "lg"]}
                    key={f}
                    variant="solid"
                    colorScheme="black"
                    color="black"
                    w="fit-content"
                    _hover={{ variant: "outline", textShadow: "0px 0px 4px" }}
                  >
                    <TagLabel>{f}</TagLabel>
                  </Tag>
                ))}
              </HStack>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              w="80vw"
              h="fit-content"
              justifyContent="center"
              alignItems="center"
              p="1rem"
            >
              <HStack
                spacing={4}
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
              >
                {others.map((f) => (
                  <Tag
                    size={["md", "lg"]}
                    key={f}
                    variant="solid"
                    colorScheme="black"
                    color="black"
                    w="fit-content"
                    _hover={{ variant: "outline", textShadow: "0px 0px 4px" }}
                  >
                    <TagLabel>{f}</TagLabel>
                  </Tag>
                ))}
              </HStack>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              w="80vw"
              h="fit-content"
              justifyContent="center"
              alignItems="center"
              p="1rem"
            >
              <HStack
                spacing={4}
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
              >
                {ml.map((f) => (
                  <Tag
                    size={["md", "lg"]}
                    key={f}
                    variant="solid"
                    colorScheme="black"
                    color="black"
                    w="fit-content"
                    _hover={{ variant: "outline", textShadow: "0px 0px 4px" }}
                  >
                    <TagLabel>{f}</TagLabel>
                  </Tag>
                ))}
              </HStack>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

  
