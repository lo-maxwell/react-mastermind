# **Mastermind Design Doc**

## Functional Description

Recreating Mastermind in React

### **Game Rules**

### Constants

  * G - Maximum number of guesses by the player
  * C - Number of possible colors
  * B - Number of bubbles to guess correctly

Grid of B bubbles per row, G rows

Color Palette on the side with the C possible colors lined up

Grid displays previous guesses and the current guess, and has a lock in/finish guessing button that moves you down a row

Each bubble has 2 states - empty, colored (with C possible colors). We do not differentiate the colors here -- this is just for display, we have separate win condition checkers later.

We also have the answer key on the side, which are smaller bubbles with 3 states - empty, white, black. Empty = incorrect color. White = correct color, incorrect position. Black = correct color, correct position.

On a given turn, the user selects a color from the color palette and then selects an empty bubble in the active row to change it to that color. When they have selected colors for all active bubbles, they can press the guess button to lock in a guess and receive information. 

The user wins if they sucessfully guess all the colors and in the right order.

The user loses if they run out of guesses without guessing correctly.


## **UI Features**

Ability to restart the game

Ability to start a new game with different and/or custom number of colors/guesses/bubbles

Ability to quickly switch between colors -- maybe by hotkeys, or selecting colors from not just the palette but anywhere.

Rules popup

## **Classes/Objects/Components**
Have React only handle rendering
### Bubble
  * Element to display part of a guess
  * React Bubble - Circular Button with color
  * Field: Value - used by react to determine display
    * Empty
    * Colored (with x color)
  * Field: Locked - color can no longer be changed, and user can change their color to this
    * True
    * False
  * onClick: 
    * If not locked: 
      * Change Value to the user's currently selected color.
    * If locked:
      * Change the user's currently selected color to Value. 

### Color Palette
 * Collection of locked bubbles to allow user to pick colors to guess with
 * React Color Palette - contains a set of one of each colored Bubble
 * Field: Size

### Answer Key
  * Collection of elements to display correct/incorrect guesses
  * React Row of colored circles -- not interactible
  * Field: Size

### Settings Menu
  * Change game constants on next restart

### Game
  * Overarching container for all other components
  * Determines layout

## Filesystem

### Page.tsx

Main container, contains Game component and relevant setup

### Styles.css

Contains styling for buttons and webpage

### Layout.tsx

Binds React code to Styles and Url

### node_modules/

Contains dependencies
  
## Goals/Timeline

  * Set up webpage - get a blank page to load, with some default text
  * Build the Bubble Component, and display a single Bubble
  * Build a grid of Bubbles, and the color palette
  * Build the answer key
  * Add game setup - initial load of colors
  * Add game functions - selecting colors from the palette, locking in a guess
  * Build the Game Component, which contains the bubble grid and various settings buttons
  * Add customizable settings
  * Extra features:
    * Display solution button
    * Undo button

