import React from 'react'
import propTypes from "prop-types";

import styles from './index.m.less'

export default function WaterfallPlus (props) {
    const { renderItem } = props;

    function getDataGroups() {
        const { dataSource = [], columns = 2 } = props;
        const heightGroups: number[] = [];
        const dataGroups: Array<any[]> = [];

        for (let index = 0; index < columns; index++) {
            heightGroups.push(0);
            dataGroups.push([]);
        }

        dataSource.forEach((item, index) => {
            let minHeight = Math.min.apply(Math, heightGroups);
            let targetGroupIndex = Math.max(heightGroups.indexOf(minHeight), 0);

            const dataGroup = dataGroups[targetGroupIndex];

            if (typeof item.height === 'number') {
                heightGroups[targetGroupIndex] += item.height;
                // 上一个元素的下标值
                const prevItemEndThreshold = dataGroup[dataGroup.length - 1]
                    ? dataGroup[dataGroup.length - 1]._endThreshold
                    : 0;


                dataGroup.push(item);
            } else {
                console.warn('waterfall 组件接受的数据, 必须含 height 字段!', item);
            }
        });
        return { dataGroups };
    }
    const { dataGroups } = getDataGroups();

    return (
        <div className={styles.waterfall} style={props.style}>
            {dataGroups.map((dataGroup, g) => {
                return (
                    <div key={g} className={styles.column}>
                        {dataGroup.map((item, i) => {
                            if (item._visible == false) return null;
                            return (
                                <div
                                    key={`g_${g}_${i}`}
                                    className='waterfall-item'
                                    style={{ height: item.height }}
                                    data-group={g}
                                    data-index={i}
                                    data-s={item._startThreshold}
                                    data-e={item._endThreshold}>
                                    {renderItem(item, `g_${g}_${i}`)}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

WaterfallPlus.propTypes = {
    renderItem: propTypes.func, // 渲染子元素
    columns: propTypes.number, // 共有几列
    dataSource: propTypes.array, // 数据源
    // scrollOffest: propTypes.number, // 页面滚动偏移量
    style: propTypes.object, // 根节点样式
};

WaterfallPlus.defaultProps = {
    renderItem: () => {},
    columns: 2,
    // scrollOffest: 0,
    dataSource: [],
};
