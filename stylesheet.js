import React from 'react';
import { StyleSheet } from 'react-360';

export const styles = StyleSheet.create({
  leftPanel: {
    width: 300,
    height: 600,
    backgroundColor: '#00171F',
    borderColor: '#003459',
    borderWidth: 10,
    flexDirection: 'column',
    padding: 10,
  },
  rightPanel: {
    width: 300,
    height: 600,
    backgroundColor: '#00171F',
    borderColor: '#003459',
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  centerPanel: {
    width: 500,
    height: 400,
    backgroundColor: '#00171F',
    borderColor: '#003459',
    borderWidth: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    /* opacity: 0.7, */
  },
  header: {
    backgroundColor: '#003459',
  },
  headerText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textSize: {
    fontSize: 19,
    textAlign: 'center'
  },
  infoHeader: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#0EB1D2',
    borderColor: 'rgb(255,255,255)',
    borderWidth: 2.5
  },
  buttonCenter: {
    height: 50,
    width: 225,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#0EB1D2',
    borderColor: 'rgb(255,255,255)',
    borderWidth: 2.5
  },
  buttonRate: {
    height: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#0EB1D2',
    borderColor: 'rgb(255,255,255)',
    borderWidth: .5,
    marginBottom: 5
  },
  hover: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#0073B7',
    borderColor: 'rgb(255,255,255)',
    borderWidth: 2.5,
  },
  hoverCenter: {
    height: 50,
    width: 225,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#0073B7',
    borderColor: 'rgb(255,255,255)',
    borderWidth: 2.5,
  },
});

export default styles;
