import { createLazyFileRoute } from '@tanstack/react-router';
import KStoryTile from '../components/KStoryTile.tsx';
import './index.scss';
import { Fragment, useState } from 'react';

const stories = [
  {
    title: 'The Three Pigs',
    img: '/the-three-pigs.png',
  },
  {
    title: 'Female Itachi',
    img: '/itachi-wannabe.jpg',
  },
  {
    title: 'Lost in Zion',
    img: '/zion.jpg',
  },
  {
    title: 'Red Ridding Reinterpreted',
    img: '/red-ridding.jpg',
  },
  {
    title: 'The Way of Kings: Chapter 1',
    img: '/way-of-kings.jpg',
  },
];

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="app">
      <div className="app__stories">
        {stories.map((s, index) => (
          <Fragment key={index}>
            <KStoryTile img={s.img} title={s.title} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
