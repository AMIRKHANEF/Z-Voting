pragma circom 2.0.0;
include "../../node_modules/circomlib/circuits/mux1.circom";
include "../../node_modules/circomlib/circuits/comparators.circom";
include "./calculateTotal.circom";

// This file contains circuits for quintary Merkle tree verifcation.
// It assumes that each node contains 5 leaves, as we use the PoseidonT6
// circuit to hash leaves, which supports up to 5 input elements.

/*
Note: circom has some particularities which limit the code patterns we can use.

- You can only assign a value to a signal once.
- A component's input signal must only be wired to another component's output
  signal.
- Variables can store linear combinations, and can also be used for loops,
  declaring sizes of things, and anything that is not related to inputs of a
  circuit.
- The compiler fails whenever you try to mix invalid elements.
- You can't use a signal as a list index.
*/


/*
 * Given a list of items and an index, output the item at the position denoted
 * by the index. The number of items must be less than 8, and the index must
 * be less than the number of items.
 */
template QuinSelector(choices) {
    signal input in[choices];
    signal input index;
    signal output out;
    
    // Ensure that index < choices
    component lessThan = LessThan(3);
    lessThan.in[0] <== index;
    lessThan.in[1] <== choices;
    lessThan.out === 1;

    component calcTotal = CalculateTotal(choices);
    component eqs[choices];

    // For each item, check whether its index equals the input index.
    for (var i = 0; i < choices; i ++) {
        eqs[i] = IsEqual();
        eqs[i].in[0] <== i;
        eqs[i].in[1] <== index;

        // eqs[i].out is 1 if the index matches. As such, at most one input to
        // calcTotal is not 0.
        calcTotal.nums[i] <== eqs[i].out * in[i];
    }

    // Returns 0 + 0 + 0 + item
    out <== calcTotal.sum;
}
