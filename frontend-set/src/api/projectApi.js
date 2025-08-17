import api from '@/api'

const BASE_URL = '/project'

export const getProjects = async () => {
    try {
        const res = await api.get('/project/list', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        const projectList = res.data

        for (const project of projectList) {
            if (project.images == undefined || project.images.length === 0) {
                const tempImage = {
                    imageType: 'Project',
                    imageUrl: '/images/logo.png',
                    postId: project.projectId,
                    createdAt: '',
                }

                project.images = [tempImage]
                project.thumbnailImage = tempImage
                project.thumbnailUrl = tempImage.imageUrl
            }
        }

        return projectList
    } catch (error) {
        console.error('프로젝트 리스트 조회 실패:', error)
        throw error
    }
}

export const getRecommendedProjects = async () => {
    try {
        const res = await api.get('/project/list/keyword', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        const projectList = res.data

        console.log('✅ getRecommendedProjects - projectList before:', projectList)

        for (const project of projectList) {
            if (project.images == undefined || project.images.length === 0) {
                const tempImage = {
                    imageType: 'Project',
                    imageUrl: '/images/logo.png',
                    postId: project.projectId,
                    createdAt: '',
                }

                project.images = [tempImage]
                project.thumbnailImage = tempImage
                project.thumbnailUrl = tempImage.imageUrl
            }
        }

        console.log('✅ getRecommendedProjects - projectList after:', projectList)

        return projectList
    } catch (error) {
        console.error('관심 기반 프로젝트 리스트 조회 실패:', error)
        throw error
    }
}

export const getProjectFullDetail = async (projectId) => {
    console.log('✅ getProjectFullDetail 호출!')

    try {
        const res = await api.get(`/project/list/detail/${projectId}/full`)

        const project = res.data

        console.log('✅ getProjectFullDetail - project:', project)

        const tempImage = {
            imageType: 'Project',
            imageUrl: '/images/logo.png',
            postId: project.projectId,
            createdAt: '',
        }

        if (project.imageList == undefined || project.imageList.length === 0) {
            project.imageList = [tempImage]
        }

        console.log('✅ getProjectFullDetail - projectList:', project)

        return project
    } catch (error) {
        console.error('프로젝트 Detail Full 조회 실패:', error)
        throw error
    }
}

export const getRelatedProjects = async (projectId) => {
    console.log('✅ getRelatedProjects 호출')

    try {
        const res = await api.get(`/project/related/${projectId}`)

        const relatedProjects = res.data

        return relatedProjects
    } catch (error) {
        console.error('관련 프로젝트 조회 실패:', error)
        throw error
    }
}
