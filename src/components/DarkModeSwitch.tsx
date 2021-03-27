import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useColorMode, Switch, Flex } from "@chakra-ui/react";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Flex>
      <Switch
        colorScheme="twitter"
        isChecked={isDark}
        zIndex={5}
        onChange={toggleColorMode}
        px={2}
      />
      {isDark ? <MoonIcon /> : <SunIcon />}
    </Flex>
  );
};
