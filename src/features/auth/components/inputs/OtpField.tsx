import React, { useMemo, useRef } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = {
  value: string;
  length?: number;
  onChange: (v: string) => void;
};

export function OtpField({ value, length = 4, onChange }: Props) {
  const inputRef = useRef<TextInput>(null);

  const cells = useMemo(() => {
    const arr = new Array(length).fill('');
    return arr.map((_, i) => value[i] ?? '');
  }, [value, length]);

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View style={styles.row}>
        {cells.map((c, idx) => (
          <View key={idx} style={[styles.cell, c ? styles.filled : undefined]}>
            <Text style={styles.cellText}>{c ? c : ''}</Text>
          </View>
        ))}
      </View>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChange}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        maxLength={length}
        style={styles.hidden}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cell: {
    flex: 1,
    height: 80,
    width: 80,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceDefault,
  },
  filled: {
    borderColor: theme.colors.borderPrimaryDefault,
  },
  cellText: {
    fontSize: 30,
    fontWeight: '800',
    color: theme.colors.textDefaultHeading,
  },
  hidden: {
    position: 'absolute',
    opacity: 0,
    height: 1,
    width: 1,
  },
}));
