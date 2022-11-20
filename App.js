import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-web";

function App(props) {
  const [isBar1Full, setBar1Full] = useState(false);
  const [isBar2Full, setBar2Full] = useState(false);
  const [isBar3Full, setBar3Full] = useState(false);
  const [isBar4Full, setBar4Full] = useState(false);

  const [bar1Count, setBar1Count] = useState(0);
  const [bar2Count, setBar2Count] = useState(0);
  const [bar3Count, setBar3Count] = useState(0);
  const [bar4Count, setBar4Count] = useState(0);

  const [noteHeight, setNoteHeight] = useState(0);

  const [bar1Notes, setBar1Notes] = useState([]);
  const [bar2Notes, setBar2Notes] = useState([]);
  const [bar3Notes, setBar3Notes] = useState([]);
  const [bar4Notes, setBar4Notes] = useState([]);

  const [bar1Interval, setBar1Interval] = useState("");
  const [bar2Interval, setBar2Interval] = useState("");
  const [bar3Interval, setBar3Interval] = useState("");
  const [bar4Interval, setBar4Interval] = useState("");

  const [bar1Note1, setBar1Note1] = useState(false);
  const [bar1Note2, setBar1Note2] = useState(false);
  const [bar1Note3, setBar1Note3] = useState(false);

  const [bar2Note1, setBar2Note1] = useState(false);
  const [bar2Note2, setBar2Note2] = useState(false);
  const [bar2Note3, setBar2Note3] = useState(false);

  const [bar3Note1, setBar3Note1] = useState(false);
  const [bar3Note2, setBar3Note2] = useState(false);
  const [bar3Note3, setBar3Note3] = useState(false);

  const [bar4Note1, setBar4Note1] = useState(false);
  const [bar4Note2, setBar4Note2] = useState(false);
  const [bar4Note3, setBar4Note3] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notes, setNotes] = useState(["C", "D", "E", "F", "G", "A", "B"]);
  const [allnotes, setAllNotes] = useState([
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ]);
  const fillNotes = (note) => {
    if (!isBar1Full) {
      setBar1Count(bar1Count + 1);

      setBar1Notes([...bar1Notes, note]);
      setBar1Note1(true);
      if (bar1Count == 1) {
        setBar1Note2(true);
        setRefresh(!refresh);
      }
      if (bar1Count > 1) {
        setBar1Note3(true);
        setBar1Full(true);
        calculateIntervals(bar1Notes, "bar1");
      }
    } else if (!isBar2Full) {
      setBar2Count(bar2Count + 1);
      setBar2Notes([...bar2Notes, note]);
      setBar2Note1(true);
      if (bar2Count == 1) {
        setBar2Note2(true);
      }
      if (bar2Count >= 2) {
        setBar2Note3(true);
        setBar2Full(true);
        calculateIntervals(bar2Notes, "bar2");
      }
    } else if (!isBar3Full) {
      setBar3Count(bar3Count + 1);
      setBar3Notes([...bar3Notes, note]);
      setBar3Note1(true);
      if (bar3Count == 1) {
        setBar3Note2(true);
      }
      if (bar3Count >= 2) {
        setBar3Note3(true);
        setBar3Full(true);
        calculateIntervals(bar3Notes, "bar3");
      }
    } else if (!isBar4Full) {
      setBar4Count(bar4Count + 1);
      setBar4Notes([...bar4Notes, note]);
      setBar4Note1(true);

      if (bar4Count == 1) {
        setBar4Note2(true);
      }
      if (bar4Count >= 2) {
        setBar4Note3(true);
        setBar4Full(true);
        calculateIntervals(bar4Notes, "bar4");
      }
    } else {
      evaluateIntervals();
    }
  };
  const evaluateIntervals = () => {
    /*4 situations: 
    1. I IV vi V
    2. I IV I V
    3. I IV V I
    4. I vi IV V
    */
    const rootNote = bar1Notes[0];

    if (
      bar1Interval == "Major" &&
      evaluateHalfSteps(rootNote, bar2Notes[0]) == 4 &&
      bar2Interval === "Major" &&
      evaluateHalfSteps(rootNote, bar3Notes[0]) == 6 &&
      bar3Interval === "Minor" &&
      evaluateHalfSteps(rootNote, bar4Notes[0]) == 5 &&
      bar4Interval === "Major"
    ) {
      alert("I IV vi V. This is the right chord progression!");
    } else if (
      bar1Interval == "Major" &&
      evaluateHalfSteps(rootNote, bar2Notes[0]) == 4 &&
      bar2Interval === "Major" &&
      evaluateHalfSteps(rootNote, bar3Notes[0]) == 0 &&
      bar3Interval === "Major" &&
      evaluateHalfSteps(rootNote, bar4Notes[0]) == 5 &&
      bar4Interval === "Major"
    ) {
      alert("I IV I V. This is the right chord progression!");
    } else if (
      bar1Interval == "Major" &&
      evaluateHalfSteps(rootNote, bar2Notes[0]) == 5 &&
      bar2Interval === "Major" &&
      evaluateHalfSteps(rootNote, bar3Notes[0]) == 4 &&
      bar3Interval === "Major" &&
      evaluateHalfSteps(rootNote, bar4Notes[0]) == 5 &&
      bar4Interval === "Major"
    ) {
      alert("I V IV V. This is the right chord progression!");
    } else if (
      bar1Interval == "Major" &&
      evaluateHalfSteps(rootNote, bar2Notes[0]) == 6 &&
      bar2Interval === "Minor" &&
      evaluateHalfSteps(rootNote, bar3Notes[0]) == 4 &&
      bar3Interval === "Major" &&
      evaluateHalfSteps(rootNote, bar4Notes[0]) == 5 &&
      bar4Interval === "Major"
    ) {
      alert("I vi IV V. This is the right chord progression!");
    } else {
      alert("This chord niibba is not correct!");
      alert(
        bar1Interval +
          " " +
          bar2Interval +
          " " +
          bar3Interval +
          " " +
          bar4Interval
      );
    }
    if (bar1Interval === bar4Interval && rootNote === bar4Notes[0]) {
      alert(
        "Nice! You have a cadence in your chord progression! The first chord and the last chord are the same - indicating the end of a song!"
      );
    } else {
      alert(bar3Interval);
      alert(
        "Watch Out! The final chord should be the same as the first chord in the progression if the song were to end."
      );
    }
  };
  const evaluateHalfSteps = (rootNote, newNote) => {
    const rootNoteIndex = notes.indexOf(rootNote);
    const newNoteIndex = notes.indexOf(newNote);

    return Math.abs(newNoteIndex - rootNoteIndex) + 1;
  };
  const evaluateAllHalfSteps = (rootNote, newNote) => {
    const rootNoteIndex = allnotes.indexOf(rootNote);
    const newNoteIndex = allnotes.indexOf(newNote);

    return Math.abs(newNoteIndex - rootNoteIndex) + 1;
  };
  //38,18, 74,33, 111
  // 10-D
  //17-C
  //27-B
  //A-35
  //G-48
  //0-F
  //F- (-10)
  const evalHeight = (note) => {
    if (note === "A") {
      return 35;
    } else if (note === "B") {
      return 27;
    } else if (note === "C") {
      return 17;
    } else if (note === "D") {
      return 10;
    } else if (note === "E") {
      return 0;
    } else if (note === "F") {
      return -10;
    } else if (note === "G") {
      return 48;
    }
  };
  const calculateIntervals = (barNotes, barName) => {
    let index1 = 0;
    let index2 = 0;
    let index3 = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < allnotes.length; j++) {
        if (allnotes[j] === barNotes[0]) {
          index1 = j;
        } else if (allnotes[j] === barNotes[1]) {
          index2 = j;
        } else if (allnotes[j] === barNotes[2]) {
          index3 = j;
        }
      }
    }
    alert(barNotes.length);
    alert(barNotes[1]);
    alert(barNotes[2]);
    const rootNoteIndex = allnotes.indexOf(barNotes[0]);
    const newNoteIndex = allnotes.indexOf(barNotes[1]);

    const interval1 = Math.abs(newNoteIndex - rootNoteIndex);

    const rootNoteIndex2 = allnotes.indexOf(barNotes[1]);
    const newNoteIndex2 = allnotes.indexOf(barNotes[2]);
    const interval2 = Math.abs(newNoteIndex2 - rootNoteIndex2);

    interval1 = parseInt(index2) - parseInt(index1);
    interval2 = parseInt(index3) - parseInt(index2);

    if (interval1 == 4 && interval2 == 3) {
      if (barName === "bar1") {
        setBar1Interval("Major");
      } else if (barName === "bar2") {
        setBar2Interval("Major");
      } else if (barName === "bar3") {
        setBar3Interval("Major");
      } else if (barName === "bar4") {
        setBar4Interval("Major");
      }
    } else {
      if (barName === "bar1") {
        setBar1Interval("Minor");
      } else if (barName === "bar2") {
        setBar2Interval("Minor");
      } else if (barName === "bar3") {
        setBar3Interval("Minor");
      } else if (barName === "bar4") {
        setBar4Interval("Minor");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectStackRow}>
        <View style={styles.rectStack}>
          <View style={styles.rect}>
            {bar1Note1 ? (
              <>
                <Image
                  source={require("./assets/re_whole_note.png")}
                  style={{
                    marginTop: evalHeight(bar1Notes[0]),
                    marginLeft: 200,
                    width: 20,
                    height: 20,
                    position: "absolute",
                  }}
                  resizeMode="contain"
                ></Image>
              </>
            ) : null}
            {bar1Note2 ? (
              <Image
                source={require("./assets/re_whole_note.png")}
                style={{
                  marginTop: evalHeight(bar1Notes[1]),
                  marginLeft: 200,
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                resizeMode="contain"
              ></Image>
            ) : null}
            {bar1Note3 ? (
              <Image
                source={require("./assets/re_whole_note.png")}
                style={{
                  marginTop: evalHeight(bar1Notes[2]),
                  marginLeft: 200,
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                resizeMode="contain"
              ></Image>
            ) : null}
            {bar2Note1 ? (
              <Image
                source={require("./assets/re_whole_note.png")}
                style={{
                  marginTop: evalHeight(bar2Notes[0]),
                  marginLeft: 600,
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                resizeMode="contain"
              ></Image>
            ) : null}
            {bar2Note2 ? (
              <Image
                source={require("./assets/re_whole_note.png")}
                style={{
                  marginTop: evalHeight(bar2Notes[1]),
                  marginLeft: 600,
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                resizeMode="contain"
              ></Image>
            ) : null}
            {bar2Note3 ? (
              <Image
                source={require("./assets/re_whole_note.png")}
                style={{
                  marginTop: evalHeight(bar2Notes[2]),
                  marginLeft: 600,
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                resizeMode="contain"
              ></Image>
            ) : null}
            {bar3Note1 ? (
              <Image
                source={require("./assets/re_whole_note.png")}
                style={{
                  marginTop: evalHeight(bar3Notes[0]),
                  marginLeft: 800,
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                resizeMode="contain"
              ></Image>
            ) : null}
            {bar3Note2 ? (
              <Image
                source={require("./assets/re_whole_note.png")}
                style={{
                  marginTop: evalHeight(bar3Notes[1]),
                  marginLeft: 800,
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                resizeMode="contain"
              ></Image>
            ) : null}
            {bar3Note3 ? (
              <Image
                source={require("./assets/re_whole_note.png")}
                style={{
                  marginTop: evalHeight(bar3Notes[2]),
                  marginLeft: 800,
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                resizeMode="contain"
              ></Image>
            ) : null}

            {bar4Note1 ? (
              <Image
                source={require("./assets/re_whole_note.png")}
                style={{
                  marginTop: evalHeight(bar4Notes[0]),
                  marginLeft: 1000,
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                resizeMode="contain"
              ></Image>
            ) : null}
            {bar4Note2 ? (
              <Image
                source={require("./assets/re_whole_note.png")}
                style={{
                  marginTop: evalHeight(bar4Notes[1]),
                  marginLeft: 1000,
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                resizeMode="contain"
              ></Image>
            ) : null}
            {bar4Note3 ? (
              <Image
                source={require("./assets/re_whole_note.png")}
                style={{
                  marginTop: evalHeight(bar4Notes[2]),
                  marginLeft: 1000,
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                resizeMode="contain"
              ></Image>
            ) : null}
            <View style={styles.rect6}></View>
            <View style={styles.rect2}></View>
            <View style={styles.rect4}></View>
          </View>
          <Image
            source={require("./assets/5a02cb3018e87004f1ca43e5.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>

          <View style={styles.rect3}></View>
          <View style={styles.rect5}></View>
          <View style={styles.rect7}></View>
          <View style={styles.rect8}></View>
          <View style={styles.rect9}></View>
        </View>
        <View style={styles.rect10}></View>
      </View>

      <Text style={styles.notes}>Notes:</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => fillNotes("A")}>
          <Text style={styles.a2}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => fillNotes("B")}>
          <Text style={styles.b7}>B</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => fillNotes("C")}>
          <Text style={styles.c11}>C</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button3Row}>
        <TouchableOpacity style={styles.button3} onPress={() => fillNotes("D")}>
          <Text style={styles.d2}>D</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button4} onPress={() => fillNotes("E")}>
          <Text style={styles.e11}>E</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button5} onPress={() => fillNotes("F")}>
          <Text style={styles.f}>F</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button6} onPress={() => fillNotes("G")}>
        <Text style={styles.g2}>G</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(188, 182, 255)",
  },
  rect: {
    top: 38,
    left: 38,
    width: 1346,
    height: 73,
    position: "absolute",
  },
  rect6: {
    width: 1346,
    height: 1,
    backgroundColor: "rgba(0,0,0,1)",
  },
  rect2: {
    width: 1346,
    height: 2,
    backgroundColor: "rgba(8,8,8,1)",
    marginTop: 18,
  },
  rect4: {
    width: 1346,
    height: 3,
    backgroundColor: "rgba(0,0,0,1)",
    marginTop: 35,
  },
  image: {
    top: 0,
    left: 0,
    width: 135,
    height: 148,
    position: "absolute",
  },
  image1: {
    marginTop: 15,
    marginLeft: 200,
    width: 20,
    height: 20,
    position: "absolute",
  },
  rect3: {
    top: 74,
    left: 35,
    width: 1349,
    height: 3,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,1)",
  },
  rect5: {
    top: 111,
    left: 44,
    width: 1340,
    height: 1,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,1)",
  },
  rect7: {
    top: 38,
    left: 368,
    width: 1,
    height: 74,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,1)",
  },
  rect8: {
    top: 38,
    left: 711,
    width: 3,
    height: 74,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,1)",
  },
  rect9: {
    top: 38,
    left: 1015,
    width: 1,
    height: 74,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,1)",
  },
  rectStack: {
    width: 1384,
    height: 148,
  },
  rect10: {
    width: 1,
    height: 73,
    backgroundColor: "rgba(0,0,0,1)",
    marginTop: 39,
  },
  rectStackRow: {
    height: 148,
    flexDirection: "row",
    marginTop: 58,
    marginLeft: -32,
    marginRight: 13,
  },
  placeholder: {
    color: "#121212",
    height: 48,
    width: 300,
    marginTop: 143,
    marginLeft: 600,
  },
  notes: {
    color: "rgb(255, 255, 255)",
    lineHeight: 30,
    fontSize: 26,
    marginTop: 71,
    marginLeft: 643,
  },
  button: {
    width: 135,
    height: 43,
    backgroundColor: "rgb(184, 225, 255)",
    borderRadius: 36,
  },
  button1: {
    width: 135,
    height: 43,
    backgroundColor: "rgb(184, 225, 255)",
    borderRadius: 36,
    marginLeft: 26,
  },
  button2: {
    width: 135,
    height: 43,
    backgroundColor: "rgb(184, 225, 255)",
    borderRadius: 36,
    marginLeft: 25,
  },
  buttonRow: {
    height: 43,
    flexDirection: "row",
    marginTop: 21,
    marginLeft: 455,
    marginRight: 455,
  },
  button3: {
    width: 135,
    height: 43,
    backgroundColor: "rgb(184, 225, 255)",
    borderRadius: 36,
  },
  button4: {
    width: 135,
    height: 43,
    backgroundColor: "rgb(184, 225, 255)",
    borderRadius: 36,
    marginLeft: 26,
  },
  button5: {
    width: 135,
    height: 43,
    backgroundColor: "rgb(184, 225, 255)",
    borderRadius: 36,
    marginLeft: 25,
  },
  button3Row: {
    height: 43,
    flexDirection: "row",
    marginTop: 28,
    marginLeft: 455,
    marginRight: 455,
  },
  button6: {
    width: 135,
    height: 43,
    backgroundColor: "rgb(184, 225, 255)",
    borderRadius: 36,
    marginTop: 32,
    marginLeft: 616,
  },
  key: {
    color: "rgb(255, 255, 255)",
    lineHeight: 25,
    fontSize: 26,
    marginTop: -384,
    marginLeft: 657,
  },
  a2: {
    color: "#121212",
    marginTop: 12,
    marginLeft: 63,
  },
  button1: {
    width: 135,
    height: 43,
    backgroundColor: "rgb(184, 225, 255)",
    borderRadius: 36,
    marginLeft: 25,
  },
  b7: {
    color: "#121212",
    marginTop: 12,
    marginLeft: 63,
  },

  c11: {
    color: "#121212",
    marginTop: 12,
    marginLeft: 63,
  },

  d2: {
    color: "#121212",
    marginTop: 13,
    marginLeft: 63,
  },

  e11: {
    color: "#121212",
    marginTop: 13,
    marginLeft: 60,
  },
  f: {
    color: "#121212",
    marginTop: 13,
    marginLeft: 63,
  },
  g2: {
    color: "#121212",
    marginTop: 13,
    marginLeft: 62,
  },
});

export default App;
