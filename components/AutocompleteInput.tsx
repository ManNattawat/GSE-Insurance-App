import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TextInput, Text, Card } from 'react-native-paper';

interface Option {
  id: string;
  name: string;
}

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onSelect: (option: Option) => void;
  options: Option[];
  placeholder?: string;
  mode?: 'outlined' | 'flat';
  style?: any;
  disabled?: boolean;
}

export default function AutocompleteInput({
  label,
  value,
  onChangeText,
  onSelect,
  options,
  placeholder,
  mode = 'outlined',
  style,
  disabled = false,
}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (value.trim() === '') {
      setFilteredOptions(options.slice(0, 10)); // แสดงแค่ 10 รายการแรก
    } else {
      const filtered = options.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10);
      setFilteredOptions(filtered);
    }
  }, [value, options]);

  const handleTextChange = (text: string) => {
    onChangeText(text);
    setShowDropdown(text.length > 0 || filteredOptions.length > 0);
  };

  const handleSelectOption = (option: Option) => {
    onSelect(option);
    setShowDropdown(false);
  };

  const renderOption = ({ item }: { item: Option }) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => handleSelectOption(item)}
    >
      <Text variant="bodyMedium">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      <TextInput
        label={label}
        value={value}
        onChangeText={handleTextChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => {
          // Delay hiding dropdown to allow selection
          setTimeout(() => setShowDropdown(false), 200);
        }}
        mode={mode}
        placeholder={placeholder}
        disabled={disabled}
        style={styles.input}
      />
      
      {showDropdown && filteredOptions.length > 0 && (
        <Card style={styles.dropdown}>
          <FlatList
            data={filteredOptions}
            renderItem={renderOption}
            keyExtractor={(item) => item.id}
            style={styles.optionsList}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          />
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  input: {
    backgroundColor: 'transparent',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    maxHeight: 200,
    elevation: 8,
    zIndex: 1000,
  },
  optionsList: {
    maxHeight: 200,
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
});