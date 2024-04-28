import {
  LayoutChangeEvent,
  FlatList,
  View,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from "react-native";
import {
  Checkbox,
  Divider,
  Menu,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import React, {
  forwardRef,
  useEffect,
  useState,
  useCallback,
  Fragment,
  ForwardedRef,
  ReactNode,
} from "react";
import { Props } from "react-native-paper/lib/typescript/components/TextInput/TextInput";
import { InternalTheme } from "react-native-paper/lib/typescript/types";
import { theme as appTheme } from "../style/theme";

const DropDown = forwardRef<View, DropDownPropsInterface>(
  (props, ref: ForwardedRef<View>) => {
    const activeTheme = useTheme();
    const {
      style,
      multiSelect = false,
      visible,
      onDismiss,
      showDropDown,
      value,
      setValue,
      activeColor,
      mode,
      label,
      placeholder,
      inputProps,
      list,
      rippleColor,
      dropDownContainerMaxHeight,
      dropDownContainerHeight,
      theme,
      textInputStyle,
      dropDownStyle,
      dropDownItemStyle,
      dropDownItemSelectedStyle,
      dropDownItemTextStyle,
      dropDownItemSelectedTextStyle,
      accessibilityLabel,
    } = props;
    const [displayValue, setDisplayValue] = useState("");
    const [inputLayout, setInputLayout] = useState({
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    });

    const onLayout = (event: LayoutChangeEvent) => {
      setInputLayout(event.nativeEvent.layout);
    };

    useEffect(() => {
      if (multiSelect) {
        const _labels = list
          .filter((_) => value.indexOf(_.value) !== -1)
          .map((_) => _.label)
          .join(", ");
        setDisplayValue(_labels);
      } else {
        const _label = list.find((_) => _.value === value)?.label || "";
        setDisplayValue(_label);
      }
    }, [list, value]);

    const isActive = useCallback(
      (currentValue: any) => {
        if (multiSelect) {
          return value.indexOf(currentValue) !== -1;
        } else {
          return value === currentValue;
        }
      },
      [value],
    );

    const setActive = useCallback(
      (currentValue: any) => {
        if (multiSelect) {
          const valueIndex = value.indexOf(currentValue);
          const values = value.split(",");
          if (valueIndex === -1) {
            setValue([...values, currentValue].join(","));
          } else {
            setValue(
              [...values].filter((value) => value !== currentValue).join(","),
            );
          }
        } else {
          setValue(currentValue);
        }
      },
      [value],
    );

    const renderItem = useCallback(
      ({ item }: { item: ListItem }) => (
        <Fragment key={item.value}>
          <TouchableRipple
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              setActive(item.value);
              if (onDismiss) {
                onDismiss();
              }
            }}
          >
            <Fragment>
              <Menu.Item
                titleStyle={{
                  color: isActive(item.value)
                    ? activeColor || (theme || activeTheme).colors.primary
                    : (theme || activeTheme).colors.onSurface,
                  ...(isActive(item.value)
                    ? dropDownItemSelectedTextStyle
                    : dropDownItemTextStyle),
                }}
                title={item.custom || item.label}
                style={{
                  flex: 1,
                  maxWidth: inputLayout?.width,
                  ...(isActive(item.value)
                    ? dropDownItemSelectedStyle
                    : dropDownItemStyle),
                }}
              />
              {multiSelect && (
                <Checkbox.Android
                  theme={{
                    colors: { accent: activeTheme?.colors.primary },
                  }}
                  status={isActive(item.value) ? "checked" : "unchecked"}
                  onPress={() => setActive(item.value)}
                />
              )}
            </Fragment>
          </TouchableRipple>
          <Divider />
        </Fragment>
      ),
      [],
    );

    return (
      <Menu
        visible={visible}
        onDismiss={onDismiss}
        theme={theme}
        anchor={
          <TouchableRipple
            ref={ref}
            onPress={showDropDown}
            onLayout={onLayout}
            rippleColor={rippleColor}
            accessibilityLabel={accessibilityLabel}
          >
            <View pointerEvents={"none"} style={style}>
              <TextInput
                value={displayValue}
                style={styles.input || textInputStyle}
                underlineColor="transparent"
                mode={mode || "outlined"}
                label={label}
                selectionColor={appTheme.colors.primary}
                placeholder={placeholder}
                pointerEvents={"none"}
                theme={theme}
                right={
                  <TextInput.Icon icon={visible ? "menu-up" : "menu-down"} />
                }
                {...inputProps}
              />
            </View>
          </TouchableRipple>
        }
        style={{
          maxWidth: inputLayout?.width,
          width: inputLayout?.width,
          marginTop: inputLayout?.height,
          ...dropDownStyle,
        }}
      >
        <FlatList
          bounces={false}
          style={{
            ...(dropDownContainerHeight
              ? {
                  height: dropDownContainerHeight,
                }
              : {
                  maxHeight: dropDownContainerMaxHeight || 200,
                }),
          }}
          data={list}
          keyExtractor={(item) => item.value.toString()}
          renderItem={renderItem}
        />
      </Menu>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: appTheme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: appTheme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: appTheme.colors.error,
    paddingTop: 8,
  },
});

export default DropDown;

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

type TextInputPropsWithoutTheme = Without<Props, "theme">;

export interface ListItem {
  label: string;
  value: string | number;
  custom?: ReactNode;
}

export interface DropDownPropsInterface {
  style?: ViewStyle;
  visible: boolean;
  multiSelect?: boolean;
  onDismiss: () => void;
  showDropDown: () => void;
  value: any;
  setValue: (_value: any) => void;
  label?: string | undefined;
  placeholder?: string | undefined;
  mode?: "outlined" | "flat" | undefined;
  inputProps?: TextInputPropsWithoutTheme;
  rippleColor?: string | undefined;
  list: ListItem[];
  dropDownContainerMaxHeight?: number;
  dropDownContainerHeight?: number;
  activeColor?: string;
  theme?: InternalTheme;
  textInputStyle?: TextStyle;
  dropDownStyle?: ViewStyle;
  dropDownItemSelectedTextStyle?: TextStyle;
  dropDownItemSelectedStyle?: ViewStyle;
  dropDownItemStyle?: ViewStyle;
  dropDownItemTextStyle?: TextStyle;
  accessibilityLabel?: string;
}
