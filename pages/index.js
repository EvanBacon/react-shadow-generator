import React from "react";
import { StyleSheet, Clipboard, Text, View } from "react-native";
import { H1, Code, B } from "@expo/html-elements";

import Slider from "@react-native-community/slider";

function SliderSection({
  title,
  onValueChange,
  value = 0,
  minimumValue = 0,
  maximumValue = 1,
}) {
  const [changedvalue, setValue] = React.useState(value);
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <B>{title}</B>
        <Text>{changedvalue}</Text>
      </View>
      <Slider
        value={value}
        style={{ width: 200, height: 40 }}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        minimumTrackTintColor="#ddd"
        maximumTrackTintColor="#000000"
        thumbTintColor={"steelblue"}
        onValueChange={(value) => {
          setValue(value);
          onValueChange(value);
        }}
      />
    </View>
  );
}

const standard = {
  horizontal: 1,
  vertical: 1,
  opacity: 0.5,
  radius: 10,
};

function ControlsSection({ onValueChange }) {
  const [horizontal, setHorizontal] = React.useState(standard.horizontal);
  const [vertical, setVertical] = React.useState(standard.vertical);
  const [opacity, setOpacity] = React.useState(standard.opacity);
  const [radius, setRadius] = React.useState(standard.radius);

  React.useEffect(() => {
    if (onValueChange)
      onValueChange({
        shadowOffset: { width: horizontal, height: vertical },
        shadowOpacity: opacity,
        shadowRadius: radius,
      });
  }, [onValueChange, horizontal, vertical, opacity, radius]);
  return (
    <View style={{ flex: 1, padding: 8 }}>
      <H1 style={styles.text}>React Shadows</H1>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <SliderSection
            title="Horizontal"
            minimumValue={-50}
            maximumValue={50}
            value={standard.horizontal}
            onValueChange={setHorizontal}
          />
          <SliderSection
            title="Vertical"
            minimumValue={-50}
            maximumValue={50}
            value={standard.vertical}
            onValueChange={setVertical}
          />
          <SliderSection
            title="Opacity"
            value={standard.opacity}
            onValueChange={setOpacity}
          />
          <SliderSection
            title="Radius"
            value={standard.radius}
            maximumValue={20}
            onValueChange={setRadius}
          />
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const [code, setCode] = React.useState({});

  const codeBlock = JSON.stringify(code, null, 2);
  return (
    <View style={styles.container}>
      <ControlsSection onValueChange={setCode} />
      <View style={{ flex: 1, padding: 8, backgroundColor: "aliceblue" }}>
        <H1 style={styles.text}>Code</H1>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <Code
              style={{ backgroundColor: "#ddd", borderRadius: 8, padding: 16 }}
            >
              {codeBlock}
            </Code>
            <B
              style={{ paddingLeft: 0, padding: 8, borderRadius: 4 }}
              onPress={() => Clipboard.setString(codeBlock)}
            >
              Copy to clipboard
            </B>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          padding: 8,
          backgroundColor: "#ddd",
        }}
      >
        <H1 style={styles.text}>Preview</H1>
        <View
          style={{
            flex: 1,
            padding: 56,
          }}
        >
          <View
            style={[
              {
                flex: 1,
                backgroundColor: "white",
              },
              code,
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    fontSize: 24,
    paddingTop: 0,
    paddingBottom: 8,
  },
});
