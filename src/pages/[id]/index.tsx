import { Prisma } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "../../server/db/client";

interface Props {
    project: Prisma.ProjectsSelect
}

const Edit = ({ project }: Props) => {
    const [input, setInput] = useState(String(project.name))
    const [isEdit, setIsEdit] = useState(false)
    const router = useRouter()

    const onSubmit = async (e: any) => {
        e.preventDefault();

        await fetch('api/projects/' + project.id, {
            method: 'PUT',
            body: JSON.stringify({ name: input })
        })
            .then(() => {
                router.replace('/')
            })
            .catch(err => {
                alert(err)
                console.log(err);

            })
    }

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-5">
            <section className="min-w-full mx-auto p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
                <div className="flex">
                    <input value={input} onChange={(event: any) => setInput(event.target.value)} type="text"
                        className={(isEdit ? "border focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none border-gray-200 rounded-md" : "border-0 text-xl font-semibold text-gray-700 select-none") + " w-40 px-4 py-2 mt-2 text-gray-700 bg-white mr-2"} disabled={!isEdit} />
                    <button onClick={toggleEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>

                <div>
                    <div className="grid grid-cols-1 gap-6 mt-4">
                    </div>

                    <div className="flex justify-end mt-6">
                        <button onClick={onSubmit} className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
                </div>
            </section>
            {/* <section className="mt-16 w-full">
                {
                    projects &&
                    projects.map((project) =>
                    (<>
                        <div className="w-full px-8 py-4 my-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 flex">
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
            </section> */}

        </main>
    )
}

export default Edit

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (!params?.id) return { props: {} }

    const project = await prisma.projects.findUnique({
        where: {
            id: Number(params.id)
        }
    })

    return {
        props: { project }
    }
}