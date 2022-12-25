import { Prisma } from "@prisma/client";
import { GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "../server/db/client";

interface Props {
  projects: Prisma.ProjectsSelect[]
}

const Home = ({ projects }: Props) => {
  const [input, setInput] = useState('')
  const router = useRouter()

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (input === '') return


    await fetch('api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: input })
    })
      .then(() => refreshData())
      .catch(err => {
        alert(err)
        console.log(err);

      })
  }

  const onDelete = async (id: unknown, e: any) => {
    e.preventDefault();
    await fetch('api/projects/' + id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => refreshData())
      .catch(err => {
        alert(err)
        console.log(err);

      })
  }

  const refreshData = () => {
    router.replace(router.asPath)
  }

  return (
    <>
      <Head>
        <title>Projects Tracker App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-5">
        <section className="min-w-full mx-auto p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Projects</h2>

          <form>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Project Name</label>
                <input value={input} onChange={(event: any) => setInput(event.target.value)} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button onClick={onSubmit} className="px-8 py-2.5 leading-5 text-white transition-colors dur
              ation-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Create</button>
            </div>
          </form>
        </section>
        <section className="mt-16 w-full">
          {
            projects &&
            projects.map((project) =>
            (<>
              <div className="w-full px-8 py-4 my-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 flex">

                {/* <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0 md:text-3xl">Design Tools</h2> */}

                <div className="w-5/6">
                  <p className="mt-2 text-gray-600 dark:text-gray-200">
                    {project.name}
                  </p>
                </div>
                <div className="w-1/6 flex justify-end">
                  <button onClick={() => onDelete(project.id, event)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </>)
            )
          }
        </section>

      </main>
    </>
  );
};

export default Home;


export const getServerSideProps: GetServerSideProps = async () => {
  const projects = await prisma.projects.findMany();

  return {
    props: { projects }
  }
}