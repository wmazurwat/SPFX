import * as React from 'react';
import styles from './Spfx.module.scss';
import type { ISpfxProps } from './ISpfxProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Button, Checkbox, Input, Tab, Tabs } from '@sebgroup/green-react';

export default class Spfx extends React.Component<ISpfxProps, {}> {
  public render(): React.ReactElement<ISpfxProps> {
    const {
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.spfx} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Witaj {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>
          <Tabs>
    <Tab title={'Sekcja 1'}>
      <>
        <p>Pytanie 1.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
        <p>Pytanie 2.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
        <p>Pytanie 3.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
        <p>Pytanie 4.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
        <p>Pytanie 5.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
      </>
    </Tab>
    <Tab title={'Sekcja 2'}>
        <>
          <p>Pytanie 1.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
          <p>Pytanie 2.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
          <p>Pytanie 3.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
          <p>Pytanie 4.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
          <p>Pytanie 5.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
        </>
    </Tab>
    <Tab title={'Sekcja 3'}>
        <>
          <p>Pytanie 1.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
          <p>Pytanie 2.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
          <p>Pytanie 3.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
          <p>Pytanie 4.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
          <p>Pytanie 5.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
        </>
    </Tab>
    <Tab title={'Sekcja 4'}>
        <>
          <p>Pytanie 1.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
          <p>Pytanie 2.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
          <p>Pytanie 3.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
          <p>Pytanie 4.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
          <p>Pytanie 5.</p><Checkbox
  label="Checkbox input"
/><Input label="Input"  />
        </>
    </Tab>
  </Tabs>
          </div>
          <Button type="submit">Zapisz ankietę</Button>
        </div>
      </section>
    );
  }
}
