import { useEffect, useState } from "react"
import { Progress } from "antd"
import styled from "styled-components"

const StrengthContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StrengthText = styled.span`
  color: ${({ level }) => {
    switch (level) {
      case "Weak":
        return "#ff4d4f"
      case "Middle":
        return "#ff7a45"
      case "Strong":
        return "#52c41a"
      default:
        return "#ff4d4f"
    }
  }};
  margin-left: 8px;
`

const StyledProgress = styled(Progress)`
  .ant-progress-bg {
    background-color: ${({ percent }) => {
      if (percent && percent <= 33) return "#ff4d4f"
      if (percent && percent <= 66) return "#ff7a45"
      return "#52c41a"
    }};
  }
`

const PasswordStrengthIndicator= ({ password }) => {
  const [strength, setStrength] = useState({
    level: "Weak",
    percent: 0,
  })

  useEffect(() => {
    if (!password) {
        setStrength({ level: "Weak", percent: 0 })
      return
    }

    // Calculate password strength
    let score = 0

    // Length check
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1 // Has uppercase
    if (/[a-z]/.test(password)) score += 1 // Has lowercase
    if (/[0-9]/.test(password)) score += 1 // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 1 // Has special char

    // Determine strength level and percentage
    let level = "Weak"
    let percent = 0

    if (score <= 2) {
      level = "Weak"
      percent = 33
    } else if (score <= 4) {
      level = "Middle"
      percent = 66
    } else {
      level = "Strong"
      percent = 100
    }

    setStrength({ level, percent })
  }, [password])

  return (
    <StrengthContainer>
      <StyledProgress
        percent={strength.percent}
        showInfo={false}
        size="small"
        strokeWidth={4}
        style={{ width: "70%" }}
      />
      <StrengthText level={strength.level}>{strength.level}</StrengthText>
    </StrengthContainer>
  )
}

export default PasswordStrengthIndicator
