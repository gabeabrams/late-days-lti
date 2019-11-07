import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemListColumnHeaders from './index';

describe('client > src > Body > shared > ItemList > ItemListColumnHeaders', () => {
  it('Checks all header buttons exists when column headers are not hidden and showDueAt is true', async () => {
    // initializes the driver with the footer button
    const driver = new Driver(
      <ItemListColumnHeaders
        hideColumnHeaders={false}
        nameHeader="Assignments"
        valueHeader="Tokens Used"
        showDueAt
        onSortTypeChange={() => {}}
        sortType="by-value"
        dueAtHeader="Due At"
      />
    );

    // Checks that due at, name, and value buttons all exist
    assert(driver.elementExists('#dueheader-button'), 'due at button does not exist');
    assert(driver.elementExists('#nameheader-button'), 'name button does not exists');
    assert(driver.elementExists('#valueheader-button'), 'value button does not exist');
  });

  it('Checks name and value header buttons exists when column headers are not hidden and showDueAt is false', async () => {
    // initializes the driver with the footer button
    const driver = new Driver(
      <ItemListColumnHeaders
        hideColumnHeaders={false}
        nameHeader="Assignments"
        valueHeader="Tokens Used"
        showDueAt={false}
        onSortTypeChange={() => {}}
        sortType="by-value"
        dueAtHeader="Due At"
      />
    );

    // Checks that install and support button exist, but not uninstall button
    assert(!driver.elementExists('#dueheader-button'), 'due at button exists when it should not');
    assert(driver.elementExists('#nameheader-button'), 'name button does not exists');
    assert(driver.elementExists('#valueheader-button'), 'value button does not exist');
  });

  it('Checks header buttons does not exists when column headers are hidden', async () => {
    // initializes the driver with the footer button
    const driver = new Driver(
      <ItemListColumnHeaders
        hideColumnHeaders
        nameHeader="Assignments"
        valueHeader="Tokens Used"
        showDueAt={false}
        onSortTypeChange={() => {}}
        sortType="by-value"
        dueAtHeader="Due At"
      />
    );

    // Checks that install and support button exist, but not uninstall button
    assert(!driver.elementExists('#dueheader-button'), 'due at button exists when it should not');
    assert(!driver.elementExists('#nameheader-button'), 'name button exists when it should not');
    assert(!driver.elementExists('#valueheader-button'), 'value button exists when it should not');
  });

  it('Checks header buttons does not exists when column headers are hidden and showDueAt is true', async () => {
    // initializes the driver with the footer button
    const driver = new Driver(
      <ItemListColumnHeaders
        hideColumnHeaders
        nameHeader="Assignments"
        valueHeader="Tokens Used"
        showDueAt
        onSortTypeChange={() => {}}
        sortType="by-value"
        dueAtHeader="Due At"
      />
    );

    // Checks that install and support button exist, but not uninstall button
    assert(!driver.elementExists('#dueheader-button'), 'due at button exists when it should not');
    assert(!driver.elementExists('#nameheader-button'), 'name button exists when it should not');
    assert(!driver.elementExists('#valueheader-button'), 'value button exists when it should not');
  });
});
