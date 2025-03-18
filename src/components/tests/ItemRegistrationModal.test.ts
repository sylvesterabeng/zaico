import ItemRegistrationModal from '@/components/ItemRegistrationModal.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('ItemRegistrationModal.vue', () => {
  // isOpen が trueの時にモーダルが表示される
  it('render modal when isOpen is true', () => {
    const wrapper = mount(ItemRegistrationModal, {
      props: {
        isOpen: true,
        isLoading: false,
        formData: { title: '', quantity: 1, unit: '', category: '' },
        error: '',
      },
    })

    expect(wrapper.find('.container').exists()).toBe(true)
  })

  // isOpen が false の時にモーダルが表示される
  it('does not render modal when isOpen is false', () => {
    const wrapper = mount(ItemRegistrationModal, {
      props: {
        isOpen: false,
        isLoading: false,
        formData: { title: '', quantity: 1, unit: '', category: '' },
        error: '',
      },
    })

    expect(wrapper.find('.container').exists()).toBe(false)
  })

  // エラー props がある場合エラーメッセージが表示される
  it('displays an error message when error is provided', () => {
    const wrapper = mount(ItemRegistrationModal, {
      props: {
        isOpen: true,
        isLoading: false,
        formData: { title: '', quantity: 1, unit: '', category: '' },
        error: '登録エラー',
      },
    })

    expect(wrapper.find('.error').text()).toContain('登録エラー')
  })

  // 登録ボタンがクリックされるときにフォームの内容が emit される
  it('emits submit event with form data when clicking register', async () => {
    const formData = {
      title: 'Test Item',
      quantity: 10,
      unit: 'pcs',
      category: 'Electronics',
    }

    const wrapper = mount(ItemRegistrationModal, {
      props: {
        isOpen: true,
        isLoading: false,
        formData,
        error: '',
      },
    })

    await wrapper.find('.submit-button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('submit')
    expect(wrapper.emitted('submit')![0][0]).toEqual(formData)
  })
})
