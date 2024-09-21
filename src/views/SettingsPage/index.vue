<template>
  <div class="settings-page">
    <h1>设置页面</h1>
    <div class="authenticator-section">
      <span>启用双因素身份验证 (2FA)</span>
      <el-switch
        v-model="isAuthenticatorEnabled"
        inline-prompt
        active-text="已启用"
        inactive-text="未启用"
        :before-change="handleBeforeChange"
        :loading="isSwitchLoading"
      />
    </div>

    <el-dialog
      v-model="isDialogVisible"
      title="启用双因素身份验证 (2FA)"
      width="500px"
      :close-on-click-modal="false"
      @close="handleDialogClose"
      custom-class="center-dialog"
      append-to-body
    >
      <div class="dialog-content">
        <p>为了提高您的账户安全性,请按照以下步骤进行设置：</p>
        <ol>
          <li>在您的手机上安装身份验证器应用程序 Authenticator。</li>
          <li>使用应用程序扫描下方的二维码：</li>
        </ol>
        <div class="qr-code-container">
          <qrcode-vue :value="otpAuthUrl" :size="200" />
        </div>
        <ol start="3">
          <li>在下方输入应用程序生成的六位验证码：</li>
        </ol>
        <el-form :model="form" ref="formRef" label-width="80px" class="verification-form">
          <el-form-item
            label="验证码"
            prop="verificationCode"
            :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]"
          >
            <el-input v-model="form.verificationCode" maxlength="6"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确认启用 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import QrcodeVue from 'qrcode.vue'
import { useAuthStore } from '@/stores/auth/index.ts'

export default defineComponent({
  name: 'SettingsPage',
  components: {
    QrcodeVue
  },
  setup() {
    const isAuthenticatorEnabled = ref(false)
    const isSwitchLoading = ref(false)
    const isDialogVisible = ref(false)
    const otpAuthUrl = ref('')

    const form = ref({
      verificationCode: ''
    })
    const formRef = ref<FormInstance>()

    let beforeChangeResolve: (value: boolean) => void
    let beforeChangeReject: (reason?: any) => void

    const authStore = useAuthStore()

    onMounted(async () => {
      const result = await authStore.status2FA()
      isAuthenticatorEnabled.value = authStore.status_2FA
      console.log(authStore.status_2FA)
    })

    // 处理开关切换前的逻辑
    const handleBeforeChange = async (): Promise<boolean> => {

      if(isAuthenticatorEnabled.value === true) {
        return true
      }
      else if(isAuthenticatorEnabled.value === false) {
        const Result = await authStore.enable2FA()

        if (!Result) {
          ElMessage.error('无法获取二维码，请重试')
          return Promise.resolve(false)
        }
        // 提取 Result 中的 qr_code 和 otp_auth_url
        const { qr_code, otp_auth_url } = Result;
        otpAuthUrl.value = otp_auth_url

        isSwitchLoading.value = true
        isDialogVisible.value = true
      }

      return new Promise<boolean>((resolve, reject) => {
        beforeChangeResolve = resolve
        beforeChangeReject = reject
      })
    }

    const handleConfirm = async () => {
      if (!formRef.value) return

      await formRef.value.validate(async (valid) => {
        if (valid) {
          try {
            await verifyAuthenticatorCode(form.value.verificationCode)
            ElMessage.success('双因素身份验证已启用')
            beforeChangeResolve(true)
          } catch (error) {
            ElMessage.error('验证码错误，请重试')
            beforeChangeReject(false)
          } finally {
            isSwitchLoading.value = false
            isDialogVisible.value = false
            form.value.verificationCode = ''
          }
        } else {
          ElMessage.warning('请输入验证码')
        }
      })
    }

    const handleCancel = () => {
      isSwitchLoading.value = false
      isDialogVisible.value = false
      form.value.verificationCode = ''
    }

    const handleDialogClose = () => {
      handleCancel()
    }

    const verifyAuthenticatorCode = async (code: string): Promise<void> => {
      const result = await authStore.verify2FA(code,"2faadmin" )
    }

    return {
      isAuthenticatorEnabled,
      isSwitchLoading,
      isDialogVisible,
      handleBeforeChange,
      handleConfirm,
      handleCancel,
      handleDialogClose,
      form,
      formRef,
      otpAuthUrl
    }
  }
})
</script>

<style scoped>
.settings-page {
  padding: 20px;
  overflow: hidden;
}

.authenticator-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.dialog-content {
  padding: 10px 0;
}

.qr-code-container {
  text-align: center;
  margin: 10px 0;
}

.verification-form {
  margin-top: 10px;
}

.dialog-footer {
  text-align: right;
}
</style>
