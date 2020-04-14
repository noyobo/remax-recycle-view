import React, { ReactElement } from 'react';
import styles from './index.less';

interface demoProps {
  name: string;
}

import { View } from '@wpd/base';

export default function Demo(props: demoProps): ReactElement {
  return <View className={styles.foo}>Hello: {props.name}</View>;
}
