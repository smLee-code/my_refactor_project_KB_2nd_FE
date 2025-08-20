import api from '@/api'

const BASE_URL = '/project'

/**
 * 모든 프로젝트 목록 조회
 * @returns {Promise<Array>} 모든 프로젝트 목록
 */
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

/**
 * 관심 기반 추천 프로젝트 목록 조회
 * @returns {Promise<Array>} 관심 기반 추천 프로젝트 목록
 */
export const getRecommendedProjects = async () => {
    try {
        const res = await api.get('/project/list/keyword', {
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
        console.error('관심 기반 프로젝트 리스트 조회 실패:', error)
        throw error
    }
}

/**
 * 특정 프로젝트 상세 조회
 * @param {number} projectId - 프로젝트 ID
 * @returns {Promise<Object>} - 해당 프로젝트 상세 정보
 */
export const getProjectFullDetail = async (projectId) => {
    try {
        const res = await api.get(`/project/list/detail/${projectId}/full`)

        const project = res.data

        const tempImage = {
            imageType: 'Project',
            imageUrl: '/images/logo.png',
            postId: project.projectId,
            createdAt: '',
        }

        if (project.imageList == undefined || project.imageList.length === 0) {
            project.imageList = [tempImage]
        }

        return project
    } catch (error) {
        console.error('프로젝트 Detail Full 조회 실패:', error)
        throw error
    }
}

/**
 * 특정 프로젝트와 관련된 프로젝트 목록 조회
 * @param {number} projectId - 프로젝트 ID
 * @returns {Promise<Array>} - 관련 프로젝트 목록
 */
export const getRelatedProjects = async (projectId) => {
    try {
        const res = await api.get(`/project/related/${projectId}`)

        const relatedProjects = res.data

        return relatedProjects
    } catch (error) {
        console.error('관련 프로젝트 조회 실패:', error)
        throw error
    }
}
