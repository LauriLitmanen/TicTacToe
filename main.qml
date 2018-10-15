import QtQuick 2.9
import QtQuick.Window 2.2
import QtQuick.Controls 1.4
import "tic.js" as Tic

Window {
    id: window
        visible: true
        width: 480
        height: 480
        title: qsTr("Hello World")
        color: "lightgray"

        Text {
            id: header
            text: qsTr("Tic Tac Toe")
            font.pointSize: 30
            anchors.top: parent.top
            anchors.topMargin: 50
            anchors.horizontalCenter: parent.horizontalCenter

        }
        Rectangle{
            property int clickCounter: -1
            property var pelaaja1: []
            property var pelaaja2: []
            id: background
            color: "white"
            anchors.rightMargin: 100
            anchors.leftMargin: 100
            anchors.bottomMargin: 100
            anchors.topMargin: 100
            anchors.fill: parent


        }

        Text {
            id: instructor
            text: ''
            font.pointSize: 15
            font.family: "Verdana"
            anchors.bottom: parent.bottom
            anchors.bottomMargin: 50
            anchors.horizontalCenter: parent.horizontalCenter
        }

        Button{
            id: startBtn
            text: 'New Game'
            anchors.bottom: parent.bottom
            anchors.bottomMargin: 18
            anchors.horizontalCenter: parent.horizontalCenter
            onClicked: Tic.startNewGame()
        }

}
