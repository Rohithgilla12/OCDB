import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { deleteOneClick, updatePair } from "../store/app/appSlice";
import OneClick from "../types/oneClick";

interface PairProps {
  oneClick: OneClick;
}

export const Pair: React.FC<PairProps> = ({ oneClick }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(oneClick.key);
  const [value, setValue] = useState(oneClick.value);

  const [debouncedName] = useDebounce(name, 1500);
  const [debouncedValue] = useDebounce(value, 1500);

  if (debouncedName !== oneClick.key || debouncedValue !== oneClick.value) {
    const newOneClick: OneClick = {
      id: oneClick.id,
      key: debouncedName,
      value: debouncedValue,
    };
    dispatch(updatePair(newOneClick));
  }

  const handleNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setName(event.target.value);

  const handleValueChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setValue(event.target.value);

  return (
    <Box m={4} p={2} display="flex" flexDirection="row" key={oneClick.id}>
      <InputGroup mx={4} flex="1" size="sm">
        <InputLeftAddon children="Name" />
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </InputGroup>
      <InputGroup mx={4} flex="1" size="sm">
        <InputLeftAddon children="Value" />
        <Textarea
          type="text"
          placeholder="Name"
          value={value}
          size="xs"
          onChange={handleValueChange}
        />
      </InputGroup>
      <IconButton
        aria-label="Search database"
        variant="solid"
        colorScheme="red"
        onClick={() => dispatch(deleteOneClick(oneClick.id))}
        icon={<DeleteIcon />}
      />
    </Box>
  );
};
