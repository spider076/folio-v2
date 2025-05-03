import Link from 'next/link';
import React from 'react'
import GitHubCalendar from 'react-github-calendar';

const GithubCalender = () => {
  return (
    <main className='wrapper'>
      <div className="title flex justify-start mt-0 md:justify-start">
        <h2 className="inline-block text-center mb-4">
          <span className="text-accent">My Github</span>:
          <Link target='_blank' href='https://github.com/spider076'>
            @spider076
          </Link> 
        </h2>
        </div>
        <div className='px-2 py-4'>
            <GitHubCalendar username="spider076" />
        </div>
    </main>
  )
}

export default GithubCalender