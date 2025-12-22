// src/app/posts/page.tsx
import { prisma } from '@/lib/prisma'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

// Definimos el tipo para las props de la página
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  user: User;
};
export default async function PostsPage(props: Props) {
  // 1. Esperamos los parámetros de la URL (Next.js 15 requirement)
  const searchParams = await props.searchParams
  const userId = searchParams.userId 
    ? Number(searchParams.userId) 
    : undefined

  // 2. Buscamos en la BD con o sin filtro
  const posts : Post[] = await prisma.post.findMany({
    where: userId ? { userId } : {}, // Filtro condicional
    include: { user: true },
    orderBy: { id: 'desc' }
  })

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {userId ? `Posts del Usuario #${userId}` : 'Blog Posts'}
          </h1>
          
          {userId && (
            <Link 
              href="/posts"
              className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full transition-colors"
            >
              ← Ver todos los posts
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No hay posts para mostrar.</p>
            {userId && <p className="text-sm text-gray-400 mt-2">Intenta quitar el filtro de usuario.</p>}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                authorName={post.user?.name || 'Desconocido'}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}